const UserScript = document.createElement('script');
UserScript.src = '../../Components/User.js';

const billScript = document.createElement('script');
billScript.src = '../../Components/Bill.js';

const incomeScript = document.createElement('script');
incomeScript.src = 'Income/Income.js';

const outGoingScript = document.createElement('script');
outGoingScript.src = 'Outgoing/Outgoing.js';

const resultScript = document.createElement('script');
resultScript.src = 'Result/Result.js';

const GlobalCss = document.createElement('link');
GlobalCss.rel = 'stylesheet';
GlobalCss.href = '../../Components/GlobalStyle.css';



customElements.define('page-one', class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
        this.loadScript();
        this.loadCss();
    }



    async loadContent() {
        const response = await fetch('Income/Income.html');
        const html = await response.text();
        this.innerHTML = html;
    }

    async loadScript() {
        document.head.appendChild(UserScript);
        document.head.appendChild(billScript);
        this.appendChild(incomeScript);
    }
    async loadCss() {
        document.head.appendChild(GlobalCss);
    }

});


customElements.define('page-two', class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
        this.loadScript();
    }

    async loadContent() {
        const response = await fetch('Outgoing/Outgoing.html');
        const html = await response.text();
        this.innerHTML = html;
    }

    async loadScript() {
        document.head.appendChild(UserScript);
        document.head.appendChild(billScript);
        this.appendChild(outGoingScript);
    }
});


customElements.define('page-three', class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
        this.loadScript();
    }

    async loadContent() {
        const response = await fetch('Result/Result.html');
        const html = await response.text();
        this.innerHTML = html;
    }

    async loadScript() {
        document.head.appendChild(UserScript);
        document.head.appendChild(billScript);
        this.appendChild(resultScript);
    }
});
