const UserScript = document.createElement('script');
UserScript.src = '../../User.js';

const billScript = document.createElement('script');
billScript.src = '../../Bill.js';

const incomeScript = document.createElement('script');
incomeScript.src = 'Income/Income.js';

const outGoingScript = document.createElement('script');
outGoingScript.src = 'Outgoing/Outgoing.js';

const resultScript = document.createElement('script');
resultScript.src = 'Result/Result.js';

customElements.define('page-one', class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
        this.loadScript();
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
