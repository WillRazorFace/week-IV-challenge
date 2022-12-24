class surveyForm {
    constructor(
        private sectionElement: HTMLElement,
        private backButton?: HTMLButtonElement,
        private nextButton?: HTMLButtonElement,
        private skipButton?: HTMLButtonElement,
        private submitPlaceholder?: HTMLButtonElement,
        private surveyImageElement?: HTMLImageElement,
        private images: [string, string, string, string] = [
            'img/two.png',
            'img/three.png',
            'img/four.png',
            'img/five.png'
        ],
        private currentSection: number = 1
    ) {
        this.backButton = document.getElementById('back-button')! as HTMLButtonElement;
        this.nextButton =  document.getElementById('next-button')! as HTMLButtonElement;
        this.skipButton = document.getElementById('skip-button')! as HTMLButtonElement;
        this.submitPlaceholder = document.getElementById('submit-placeholder')! as HTMLButtonElement;

        this.surveyImageElement = document.getElementById('poll-img')! as HTMLImageElement;

        this.backButton.addEventListener('click', this.backButtonListener.bind(this));
        this.nextButton.addEventListener('click', this.nextButtonListener.bind(this));
        this.skipButton.addEventListener('click', this.skipButtonListener.bind(this));

        this.submitPlaceholder.addEventListener('click', this.submitPlaceholderListener.bind(this));

        // Listeners para cada botão submit de cada <form>
        this.sectionElement.querySelector('#section-submit-1')?.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-1'
            )! as HTMLFormElement;

            const accountStatus = currentFormElement.querySelectorAll('select')[0].value;

            const operatingMarket = currentFormElement.querySelector<HTMLInputElement>(
                'input[name="market"]:checked'
            );

            if (!operatingMarket || accountStatus == '') {
                alert('Preencha.');

                return;
            }

            localStorage.setItem('accountStatus', accountStatus);
            localStorage.setItem('operatingMarket', operatingMarket.value);

            this.renderSection('next');
        });
    }

    private renderSection(render: 'next' | 'previous') {
        const section = render === 'previous' ? this.currentSection - 1 : this.currentSection + 1;

        // Altera a imagem renderizada
        this.surveyImageElement!.src = this.images[section - 1];

        // Altera a seção do formulário
        const currentSection = this.sectionElement.querySelector(`#form-section-${this.currentSection}`)! as HTMLElement;
        const nextSection = this.sectionElement.querySelector(`#form-section-${section}`)! as HTMLElement;

        currentSection.hidden = true;
        nextSection.hidden = false;

        // Altera os botões apresentados
        const submitButton = document.getElementById('submit-placeholder')! as HTMLButtonElement;

        if (section === 4) {
            this.skipButton!.hidden = true;
            this.nextButton!.hidden = true;
            submitButton.hidden = false;
        } else {
            this.skipButton!.hidden = false;
            this.nextButton!.hidden = false;
            submitButton.hidden = true;
        }

        this.currentSection = section;
    }

    private backButtonListener(event: Event) {
        event.preventDefault();

        if(this.currentSection === 1) window.location.href = '/survey.html';
        else this.renderSection('previous');
    }

    private nextButtonListener(event: Event) {
        event.preventDefault();

        this.submitCurrentSection();
    }

    private skipButtonListener(event: Event) {
        event.preventDefault();

        this.renderSection('next');
    }

    private submitPlaceholderListener(event: Event) {
        event.preventDefault();

        this.submitCurrentSection();
    }

    private submitCurrentSection() {
        this.sectionElement.querySelector<HTMLButtonElement>(
            `#section-submit-${this.currentSection}`
        )!.click();
    }
}

const sectionElement = document.getElementById('survey-form')! as HTMLElement;

const form = new surveyForm(sectionElement);