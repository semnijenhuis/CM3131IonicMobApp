customElements.define('page-one',class classOne extends HTMLElement {
    connectedCallback() {
        this.loadContent();
    }
    async loadContent() {
        const response = await fetch('Income/Income.html');
        const html = await response.text();
        this.innerHTML = html;
    }


});
customElements.define('page-two',class classTwo extends HTMLElement {
    connectedCallback() {
        this.loadContent();
    }
    async loadContent() {
        const response = await fetch('Outgoing/Outgoing.html');
        const html = await response.text();
        this.innerHTML = html;
    }
});

customElements.define('page-three',class classThree extends HTMLElement {
    connectedCallback() {
        this.loadContent();
    }
    async loadContent() {
        const response = await fetch('Result/Result.html');
        const html = await response.text();
        this.innerHTML = html;
    }
});
