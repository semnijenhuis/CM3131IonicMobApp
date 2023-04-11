customElements.define('page-one', class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
        this.loadScript();
    }
    async loadContent() {
        const response = await fetch('AccountSettings.html');
        const html = await response.text();
        this.innerHTML = html;
    }
    async loadScript() {
        //
        // document.head.appendChild(UserScript);
        // document.head.appendChild(billScript);
        //
        // const incomeScript = document.createElement('script');
        // incomeScript.src = 'Income/Income.js';
        // this.appendChild(incomeScript);


    }
});
