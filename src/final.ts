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
)! as HTMLParagraphElement;
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

finalHeader.innerHTML = `${localStorage.getItem('fullName')}, thanks for participating in the poll!`;

const storageAccountStatus = parseInt(localStorage.getItem('accountStatus')!) - 1;
const storageOperatingMarket = parseInt(localStorage.getItem('operatingMarket')!) -1;
const storageInvestmentFrequency = parseInt(localStorage.getItem('investmentFrequency')!) - 1;
const storageTrainingResources = localStorage.getItem('trainingResources')!.split(',');

const allTrainingResources: string[] = [];

storageTrainingResources.forEach((trainingResource) => {
    allTrainingResources.push(trainingResourcesOptions[parseInt(trainingResource) - 1]);
});

const trainingResourcesText = allTrainingResources.join(', ');

accountStatusElement.innerHTML = `${accountStatusOptions[storageAccountStatus]}`;
operatingMarketElement.innerHTML = `${operatingMarketOptions[storageOperatingMarket]}`;
investmentFrequencyElement.innerHTML = `${investmentFrequencyOptions[storageInvestmentFrequency]}`;
trainingResourcesElement.innerHTML = `${trainingResourcesText}`;
knowedLossElement.innerHTML = `${localStorage.getItem('details')}`;