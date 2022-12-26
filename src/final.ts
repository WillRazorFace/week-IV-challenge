const accountStatusOptions = [
    'I have not created an account yet.',
    'I already have an account and use it frequently',
    "I already have an account and I don't use it anymore",
]

const operatingMarketOptions = [
    'Stock Market',
    'Foreign Exchange',
    'Commodity',
    'Bond Market',
    'Cryptocurrency Market',
]

const investmentFrequencyOptions = [
    'I have not invested yet',
    'I invest often',
    'I already invested and went bankrupt',
]

const trainingResourcesOptions = [
    'Books and Articles',
    'YouTube Tutorial Videos',
    'Online or Face to Face Courses',
    'Experience With Little Investment',
]

const finalHeader = document.getElementById('final-header')! as HTMLHeadElement;

const accountStatusElement = document.getElementById(
    'account-status'
)! as HTMLDivElement;
const operatingMarketElement = document.getElementById(
    'financial-market'
)! as HTMLParagraphElement;
const investmentFrequencyElement = document.getElementById(
    'investment-frequency'
)! as HTMLParagraphElement;
const trainingResourcesElement = document.getElementById(
    'training-resources'
)! as HTMLParagraphElement;
const knowedLossElement = document.getElementById(
    'knowed-loss'
)! as HTMLParagraphElement;

finalHeader.innerHTML = `${localStorage.getItem('fullName')}, thanks for participating in the poll! Your answers have been sent and will be reviewed.`;

const storageAccountStatus = localStorage.getItem('accountStatus')!;
const storageOperatingMarket = localStorage.getItem('operatingMarket');
const storageInvestmentFrequency = localStorage.getItem('investmentFrequency');
const storageTrainingResources = localStorage.getItem('trainingResources');
const storageKnowedLoss = localStorage.getItem('details');

if (storageAccountStatus) {
    const accountStatusParagraph = accountStatusElement.querySelectorAll(
        'p'
    )[0]! as HTMLParagraphElement;

    accountStatusElement.querySelectorAll('h2')[0]!.hidden = false;
    accountStatusParagraph.hidden = false;
    accountStatusElement.hidden = false;
    
    accountStatusParagraph.innerText = `${accountStatusOptions[parseInt(
        storageAccountStatus
    ) - 1]}`;
}

if (storageOperatingMarket) {
    const operatingMarketParagraph = operatingMarketElement.querySelectorAll(
        'p'
    )[0]! as HTMLParagraphElement;

    operatingMarketElement.querySelectorAll('h2')[0]!.hidden = false;
    operatingMarketParagraph.hidden = false;
    operatingMarketElement.hidden = false;

    operatingMarketParagraph.innerText = `${operatingMarketOptions[parseInt(
        storageOperatingMarket
    ) - 1]}`;
}

if (storageInvestmentFrequency) {
    const investmentFrequencyParagraph = investmentFrequencyElement.querySelectorAll(
        'p'
    )[0]! as HTMLParagraphElement;

    investmentFrequencyElement.querySelectorAll('h2')[0]!.hidden = false;
    investmentFrequencyParagraph.hidden = false;
    investmentFrequencyElement.hidden = false;

    investmentFrequencyParagraph.innerText = `${investmentFrequencyOptions[parseInt(
        storageInvestmentFrequency
    ) - 1]}`;
}

if (storageTrainingResources) {
    const trainingResourcesItems = storageTrainingResources.split(',');
    
    const allTrainingResources: string[] = [];

    trainingResourcesItems.forEach((trainingResource) => {
        allTrainingResources.push(trainingResourcesOptions[parseInt(trainingResource) - 1]);
    });

    const trainingResourcesText = allTrainingResources.join(', ');

    const trainingResourcesParagraph = trainingResourcesElement.querySelectorAll(
        'p'
    )[0]! as HTMLParagraphElement;

    trainingResourcesElement.querySelectorAll('h2')[0]!.hidden = false;
    trainingResourcesParagraph.hidden = false;
    trainingResourcesElement.hidden = false;

    trainingResourcesParagraph.innerText = `${trainingResourcesText}`;
}

if (storageKnowedLoss) {
    const knowedLossParagraph = knowedLossElement.querySelectorAll('p')![0] as HTMLParagraphElement;

    knowedLossElement.querySelectorAll('h2')[0]!.hidden = false;
    knowedLossParagraph.hidden = false;
    knowedLossElement.hidden = false;

    knowedLossParagraph.innerText = storageKnowedLoss;
}

localStorage.clear();