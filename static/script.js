document.getElementById('getManualLogReport').addEventListener('click', function() {
    clearMainTextField();
    const userId = document.getElementById('userId').value;

    if (validateUserId(userId)) {
        document.getElementById('popupForm').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    } else {
        alert('Invalid User ID');
    }
});

document.getElementById('submitReport').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    const offence = document.getElementById('offence').value;
    const action = document.getElementById('action').value;
    const advice = document.getElementById('advice').value;
    const rm = document.getElementById('rm').value;

    const reportData = {};
    if (offence) reportData.offence = offence;
    if (action) reportData.action = action;
    if (advice) reportData.advice = advice;
    if (rm) reportData.rm = rm.split(/\s+/).map(id => `<@${id}>`).join(' ');

    fetch('/submit_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            ...reportData
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`User not found response failure ${response}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            document.getElementById('mainTextField').value = `User not found ${data.error} `;
        } else {
            let formattedData = `${data.user_id}\n<@${data.user_id}>\n${data.username}\n\n`;
            if (data.report.offence) formattedData += `Offence: ${data.report.offence}\n`;
            if (data.report.action) formattedData += `Action: ${data.report.action}\n`;
            if (data.report.advice) formattedData += `Advice: ${data.report.advice}\n`;
            if (data.report.rm) formattedData += `RM: ${data.report.rm}\n`;

            document.getElementById('mainTextField').value += formattedData;
        }
        document.getElementById('popupForm').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('offence').value = '';
        document.getElementById('action').value = '';
        document.getElementById('advice').value = '';
        document.getElementById('rm').value = '';
    })
    .catch(error => {
        document.getElementById('mainTextField').value = `User not found catch ${error}`;
        document.getElementById('popupForm').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        console.error('Error:', error);
    });
});

function clearMainTextField() {
    document.getElementById('mainTextField').value = '';
}

function validateUserId(userId) {
    // Replace with actual validation logic as needed
    return userId.trim() !== '';
}
