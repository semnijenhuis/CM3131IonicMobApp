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
        const script = document.createElement('script');
        script.src = 'Income/Income.js';
        this.appendChild(script);
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
        const script = document.createElement('script');
        script.src = 'Outgoing/Outgoing.js';
        this.appendChild(script);
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
        const script = document.createElement('script');
        script.src = 'Result/Result.js';
        this.appendChild(script);
    }
});
