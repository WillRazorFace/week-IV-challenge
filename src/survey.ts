function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjDescriptor = {
        configurable: true,
        enumerable: false,

        get() {
            const boundFn = originalMethod.bind(this);
            
            return boundFn
        }
    }

    return adjDescriptor;
}

class surveyForm {
    constructor(
        private formElement: HTMLFormElement,
        private backButton: HTMLButtonElement,
        private nextButton: HTMLButtonElement,
        private skipButton: HTMLButtonElement,
        private currentSection = 1
    ) {
        this.backButton.addEventListener('click', this.backButtonListener.bind(this));
    }

    private backButtonListener(event: Event) {
        event.preventDefault();

        if(this.currentSection === 1) window.location.href = '/survey.html';
        else this.renderSection('previous');
    }

    @Autobind
    private renderSection(render: 'next' | 'previous') {
        const section = render === 'next' ? this.currentSection + 1 : this.currentSection - 1;

        this.formElement.querySelector(`#form-section-${this.currentSection}`)!.setAttribute('hidden', 'true');
        this.formElement.querySelector(`#form-section-${section}`)!.setAttribute('hidden', 'true');

        this.currentSection = section;
    }
}

const formElement = document.getElementById('survey-form')! as HTMLFormElement;

const backButton = document.getElementById('back-button')! as HTMLButtonElement;
const nextButton = document.getElementById('next-button')! as HTMLButtonElement;
const skipButton = document.getElementById('skip-button')! as HTMLButtonElement;

const form = new surveyForm(formElement, backButton, nextButton, skipButton);