class surveyForm {
    constructor(
        private formElement: HTMLFormElement,
        private backButton: HTMLButtonElement = document.getElementById(
            'back-button'
        )! as HTMLButtonElement,
        private nextButton: HTMLButtonElement = document.getElementById(
            'next-button'
        )! as HTMLButtonElement,
        private skipButton: HTMLButtonElement = document.getElementById(
            'skip-button'
        )! as HTMLButtonElement,
        private submitButton: HTMLButtonElement = document.getElementById(
            'submit-placeholder'
        )! as HTMLButtonElement,
        private surveyImageElement: HTMLImageElement = document.getElementById(
            'poll-img'
        )! as HTMLImageElement,
        private images: [string, string, string, string] = [
            'img/two.png',
            'img/three.png',
            'img/four.png',
            'img/five.png'
        ],
        private currentSection: number = 1
    ) {
        this.backButton.addEventListener('click', this.backButtonListener.bind(this));
        this.skipButton.addEventListener('click', this.skipButtonListener.bind(this));
        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            const submitButton = formElement.querySelector('#submit-button')! as HTMLButtonElement;

            submitButton.click();
        })
    }

    private renderSection(render: 'next' | 'previous') {
        const section = render === 'previous' ? this.currentSection - 1 : this.currentSection + 1;

        // Altera a imagem renderizada
        this.surveyImageElement.src = this.images[section - 1];

        // Altera a seção do formulário
        const currentSection = this.formElement.querySelector(`#form-section-${this.currentSection}`)! as HTMLElement;
        const nextSection = this.formElement.querySelector(`#form-section-${section}`)! as HTMLElement;

        currentSection.hidden = true;
        nextSection.hidden = false;

        // Altera os botões apresentados
        const submitButton = document.getElementById('submit-placeholder')! as HTMLButtonElement;

        if (section === 4) {
            this.skipButton.hidden = true;
            this.nextButton.hidden = true;
            submitButton.hidden = false;
        } else {
            this.skipButton.hidden = false;
            this.nextButton.hidden = false;
            submitButton.hidden = true;
        }

        this.currentSection = section;
    }

    private backButtonListener(event: Event) {
        event.preventDefault();

        if(this.currentSection === 1) window.location.href = '/survey.html';
        else this.renderSection('previous');
    }

    private skipButtonListener(event: Event) {
        event.preventDefault();

        this.renderSection('next');
    }
}

const formElement = document.getElementById('survey-form')! as HTMLFormElement;

const form = new surveyForm(formElement);