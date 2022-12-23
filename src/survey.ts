class surveyForm {
    constructor(
        private formElement: HTMLFormElement,
        private backButton: HTMLButtonElement,
        private nextButton: HTMLButtonElement,
        private skipButton: HTMLButtonElement,
        private currentSection = 1
    ) {
        this.backButton.addEventListener('click', this.backButtonListener.bind(this));
        this.skipButton.addEventListener('click', this.skipButtonListener.bind(this));
    }

    private renderSection(render: 'next' | 'previous') {
        const section = render === 'next' ? this.currentSection + 1 : this.currentSection - 1;

        const currentSection = this.formElement.querySelector(`#form-section-${this.currentSection}`)! as HTMLElement;
        const nextSection = this.formElement.querySelector(`#form-section-${section}`)! as HTMLElement;

        currentSection.hidden = true;
        nextSection.hidden = false;

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

const backButton = document.getElementById('back-button')! as HTMLButtonElement;
const nextButton = document.getElementById('next-button')! as HTMLButtonElement;
const skipButton = document.getElementById('skip-button')! as HTMLButtonElement;

const form = new surveyForm(formElement, backButton, nextButton, skipButton);