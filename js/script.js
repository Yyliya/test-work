window.addEventListener('DOMContentLoaded', function() {
    

    const inputs = document.querySelectorAll('input'),
        control = document.querySelectorAll('input[name="control"]'),
        material = document.querySelectorAll('input[name="material"]'),
        signal = document.querySelector('input[name="signal"]'),
        led = document.querySelector('input[name="led"]'),
        disp = document.querySelector('input[name="disp"]'),
        result = document.querySelector('#sum_res'),
        power = document.getElementById('power');

    const basePrice = 10000;

    inputs.forEach(function (item) {
        item.addEventListener('input', calc);
    });

    function calc() {
        const powerFan = parseInt(power.value);

        let typeControl;

        control.forEach(function(item) {
            if(item.checked) {
                typeControl = parseInt(item.value);
            }
        });

        let typeMaterial;

        material.forEach(function(item) {
            if(item.checked) {
                typeMaterial = parseInt(item.value);
            }
        });

        const signalCoast = signal.checked ? parseInt(signal.value) : 1;
        const ledCoast = led.checked ? parseInt(led.value) : 1;
        const dispCoast = disp.checked ? parseInt(disp.value) : 1;

        const totalPrice = basePrice + powerFan + typeControl + typeMaterial + signalCoast + ledCoast + dispCoast;

        const formatter = new Intl.NumberFormat('ru');
        

        result.innerText = formatter.format(totalPrice);
    }

    function req() {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/menu");
        request.setRequestHeader("Content-type", "application/json;");
        request.send();
        request.addEventListener("load", function() {
            if (request.readyState === 4 && request.status == 200) {
                let data = JSON.parse(request.response);
                console.log(data);
            }else {
                console.error("Что-то пошло не так");
            }
        });
    }
    addEventListener('click', req);
});