class surveyForm {
    constructor(
        private formElement: HTMLFormElement,
        private backButton: HTMLButtonElement,
        private nextButton: HTMLButtonElement,
        private skipButton: HTMLButtonElement,
        private currentSection = 1
    ) {
        this.backButton.addEventListener('click', this.backButtonListener);
    }

    private backButtonListener(event: Event) {
        event.preventDefault();

        if(this.currentSection === 1) window.location.href = '/survey.html';
    }
}

const formElement = document.getElementById('survey-form')! as HTMLFormElement;

const backButton = document.getElementById('back-button')! as HTMLButtonElement;
const nextButton = document.getElementById('next-button')! as HTMLButtonElement;
const skipButton = document.getElementById('skip-button')! as HTMLButtonElement;

const form = new surveyForm(formElement, backButton, nextButton, skipButton);