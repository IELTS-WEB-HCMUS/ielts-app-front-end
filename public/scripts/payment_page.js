document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('free-btn').addEventListener('click', function () {
        window.location.href = '/user/dashboard';
    });
    document.getElementById('premium-btn').addEventListener('click', function () {
        // not implemented
    });
    document.getElementById('more-search-btn').addEventListener('click', async function () {
        try {
            const response = await fetch('/user/payment/buy-more-turn', { // Trigger the POST route
                method: 'POST', // Using POST as it's an action
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(response);

            if (response.ok) {
                window.location.href = data.order_url;
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    });
});