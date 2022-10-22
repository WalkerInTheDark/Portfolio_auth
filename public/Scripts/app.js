//iife
(function(){
    function Start(){
        console.log("App Started...");
        let deleteButton = document.querySelectorAll('.btn-danger')
        for(button of deleteButton)
        {
            button.addEventListener('click', (event) =>{
                if(!confirm('Are you sure you want to delete this'))
                {
                    event.preventDefault();
                    window.location.assign("/contact-list");
                }
        });
    }
    }
    window.addEventListener("load", Start);
})();