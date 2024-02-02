const table = document.querySelector('.table');
if(table) {
    const submitButton = document.querySelector('[btn-submit]');
    submitButton.onclick = () => {
        let permissions = [];
        const roles = document.querySelectorAll('[data-id]');
        roles.forEach(role => {
            const id = role.getAttribute('data-id');
            permissions.push({
                id: id,
                permissions: []
            });
        });
        
        const rows = document.querySelectorAll('[data-name]');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            inputs.forEach((input, index) => {
                const checked = input.checked;
                if(checked) {
                    const name = row.getAttribute('data-name');
                    permissions[index].permissions.push(name);
                }
            });
        });
        
        const form = document.querySelector('form');
        const inputSubmit = document.querySelector("[name='permission']");
        inputSubmit.value = JSON.stringify(permissions);
        form.submit();
    }
}

// Checked 
const dataRecords = document.querySelector('[data-records]');
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'));
    const table = document.querySelector('.table');
    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach(permission => {
            const row = table.querySelector(`[data-name='${permission}']`);
            const input = row.querySelectorAll('input')[index];
            input.checked = true;
        });
    });
}