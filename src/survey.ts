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

        // Listener para contador de caracteres no textarea
        const formTextarea = this.sectionElement.querySelectorAll('textarea')[0]! as HTMLTextAreaElement;
        const charCounter = formTextarea.nextElementSibling! as HTMLSpanElement;

        formTextarea.addEventListener('input', (_event) => {
            charCounter.innerText = `${formTextarea.value.length}/130`;
        })

        // Listeners para cada botão submit de cada <form>
        this.sectionElement.querySelector('#section-submit-1')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-1'
            )! as HTMLFormElement;

            const accountStatusElement = currentFormElement.querySelectorAll('select')[0]! as HTMLSelectElement;
            const accountStatusValue = accountStatusElement.value;

            const operatingMarket = currentFormElement.querySelector<HTMLInputElement>(
                'input[name="market"]:checked'
            );

            if (accountStatusValue == '') {
                const errorSpan = accountStatusElement.nextElementSibling! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please select an option.', accountStatusElement);

                return;
            } else if (!operatingMarket) {
                const errorSpan = document.getElementById(
                    'operating-market-error'
                )! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please select an option.');

                return;
            }

            localStorage.setItem('accountStatus', accountStatusValue);
            localStorage.setItem('operatingMarket', operatingMarket.value);

            this.renderSection('next');
        });

        this.sectionElement.querySelector('#section-submit-2')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-2'
            )! as HTMLFormElement;

            const investmentFrequencyElement = currentFormElement.querySelectorAll('select')[0];
            const investmentFrequencyValue = investmentFrequencyElement.value;

            const trainingCheckboxes: HTMLInputElement[] = [
                currentFormElement.querySelector('#books')! as HTMLInputElement,
                currentFormElement.querySelector('#youtube')! as HTMLInputElement,
                currentFormElement.querySelector('#online')! as HTMLInputElement,
                currentFormElement.querySelector('#experience')! as HTMLInputElement,
            ];

            const trainingResources: string[] = [];

            trainingCheckboxes.forEach((checkbox) => {
                if (checkbox.checked) trainingResources.push(checkbox.value);
            })

            if (investmentFrequencyValue == '') {
                const errorSpan = investmentFrequencyElement.nextElementSibling! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please select an option.', investmentFrequencyElement);

                return;
            } else if (trainingResources.length == 0) {
                const errorSpan = document.getElementById(
                    'training-resources-error'
                )! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please select an option.');

                return;
            }

            localStorage.setItem('investmentFrequency', investmentFrequencyValue);
            localStorage.setItem('trainingResources', trainingResources.join());

            this.renderSection('next');
        });

        this.sectionElement.querySelector('#section-submit-3')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-3'
            )! as HTMLFormElement;

            const detailsElement = currentFormElement.querySelectorAll('textarea')[0];
            const detailsValue = detailsElement.value;

            if (detailsValue == '') {
                const errorSpan = document.getElementById('details-error')! as HTMLSpanElement;

                this.displayError(errorSpan, '\nPlease write something.', detailsElement);

                return;
            }

            localStorage.setItem('details', detailsValue);

            this.renderSection('next');
        });

        this.sectionElement.querySelector('#section-submit-4')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-4'
            )! as HTMLFormElement;

            const fullNameElement = currentFormElement.querySelector<HTMLInputElement>('#full-name')!;
            const fullNameValue = fullNameElement.value;

            const emailElement = currentFormElement.querySelector<HTMLInputElement>('#email')!;
            const emailValue = emailElement.value;

            const ageElement = currentFormElement.querySelector<HTMLInputElement>('#age')!;
            const ageValue = ageElement.value;

            const fullNameRegExp = /^[a-zA-Z ]+$/;
            const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            const isNameValid = fullNameRegExp.test(fullNameValue);
            const isEmailValid = emailRegExp.test(emailValue);

            if (!isNameValid) {
                const errorSpan = fullNameElement.nextElementSibling! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please enter your full name.', fullNameElement);

                return;
            } else if (!isEmailValid) {
                const errorSpan = emailElement.nextElementSibling! as HTMLSpanElement;

                this.displayError(errorSpan, 'Please enter your e-mail correctly.', emailElement);

                return;
            } else if (ageValue == '' || ageValue == '0') {
                const errorSpan = ageElement.nextElementSibling! as HTMLSpanElement;

                this.displayError(errorSpan, '\nPlease enter your age correctly.', ageElement);

                return;
            }

            localStorage.setItem('fullName', fullNameValue);
            localStorage.setItem('email', emailValue);
            localStorage.setItem('age', ageValue);

            window.location.href = '/final.html';
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
            const buttonGroup = document.getElementById('button-group-1')! as HTMLDivElement;

            buttonGroup.style.gridTemplateColumns = 'auto';
            buttonGroup.style.gridTemplateRows = '1fr 1fr';
            buttonGroup.style.gap = '20%';

            this.skipButton!.style.padding = '0.5rem';
            this.skipButton!.style.fontSize = '1.3rem';

            this.nextButton!.style.padding = '0.5rem';
            this.nextButton!.style.fontSize = '1.3rem';

            this.skipButton!.hidden = true;
            this.nextButton!.hidden = true;
            submitButton.hidden = false;
        } else {
            const buttonGroup = document.getElementById('button-group-1')! as HTMLDivElement;

            buttonGroup.style.gridTemplateColumns = '1fr 1fr';
            buttonGroup.style.gridTemplateRows = 'auto';
            buttonGroup.style.gap = '2%';

            this.skipButton!.style.padding = '0.4rem';
            this.skipButton!.style.fontSize = '1.25rem';

            this.nextButton!.style.padding = '0.25rem';
            this.nextButton!.style.fontSize = '1.25rem';

            this.skipButton!.hidden = false;
            this.nextButton!.hidden = false;
            submitButton.hidden = true;
        }

        this.currentSection = section;
    }

    private displayError(errorSpan: HTMLSpanElement, errorMessage: string, inputElement?: HTMLElement) {
        errorSpan.hidden = false;
        errorSpan.innerText = errorMessage;

        console.log(inputElement);

        if (inputElement) {
            inputElement.style.borderColor = 'rgba(255, 0, 0, 0.7)';
        }

        setTimeout(() => {
            errorSpan.hidden = true;
            errorSpan.innerText = '';

            if (inputElement) {
                inputElement.style.borderColor = '';
            }
        }, 5000)
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