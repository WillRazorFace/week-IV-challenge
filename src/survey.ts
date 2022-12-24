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
        this.sectionElement.querySelector('#section-submit-1')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-1'
            )! as HTMLFormElement;

            const accountStatus = currentFormElement.querySelectorAll('select')[0].value;

            const operatingMarket = currentFormElement.querySelector<HTMLInputElement>(
                'input[name="market"]:checked'
            );

            if (accountStatus == '') {
                alert('Por favor preencha o status de sua conta');
                return;
            } else if (!operatingMarket) {
                alert('Por favor preencha o seu mercado de operação');
                return;
            }

            localStorage.setItem('accountStatus', accountStatus);
            localStorage.setItem('operatingMarket', operatingMarket.value);

            this.renderSection('next');
        });

        this.sectionElement.querySelector('#section-submit-2')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-2'
            )! as HTMLFormElement;

            const investmentFrequency = currentFormElement.querySelectorAll('select')[0].value;

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

            if (investmentFrequency == '') {
                
            } else if (trainingResources.length == 0) {
                alert('Por favor selecione ao menos um tipo de training resource.');
                return;
            }

            localStorage.setItem('investmentFrequency', investmentFrequency);
            localStorage.setItem('trainingResources', trainingResources.join());

            this.renderSection('next');
        });

        this.sectionElement.querySelector('#section-submit-3')!.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentFormElement = this.sectionElement.querySelector(
                '#form-section-3'
            )! as HTMLFormElement;

            const details = currentFormElement.querySelectorAll('textarea')[0].value;

            if (details == '') {
                alert('Por favor relate algo');
                return;
            }

            localStorage.setItem('details', details);

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