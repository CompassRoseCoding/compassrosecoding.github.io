async function init() {
    markCurrent('home');
    resizeHeader();

    emailjs.init({
        publicKey: "4IAeMqYT9p1jc6v3n",
    });

    document.getElementById('contact_form').addEventListener('submit', function (event) {
        event.preventDefault();

        let fields = ['user_name', 'user_email', 'user_message']
    
        for (let i = 0; i < 2; i++) {
            let field = document.getElementById(fields[i]);

            if (field.value === '') {
                field.style.border = "thick solid #bb2024";
                field.placeholder = "required field"
                console.log('invalid ' + fields[i] + " element.")
                return;
            }
        }

        emailjs.sendForm('service_r4k2lfw', 'template_mh4ndrv', this)
            .then(() => {
                console.log('send SUCCESS!');
                alert("Email Sent!")
                window.location.reload();
            }, (error) => {
                console.log('send FAILED...', error);
                alert("Send failed, please try again later. ")
            });
    });
}
