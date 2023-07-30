const logout = async () => {
    await fetch('/api/logout-api', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
}

export default logout;