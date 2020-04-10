const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds, region
  } = data;
  const impact = {};
  const severeImpact = {};

  let days;

  if (periodType === 'months') {
    days = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    days = timeToElapse * 7;
  } else {
    days = timeToElapse;
  }

  const factor = Math.trunc(days / 3);
  const beds = totalHospitalBeds * 0.35;
  const avgIncome = region.avgDailyIncomeInUSD;
  const avgPopulation = region.avgDailyIncomePopulation;

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = Math.ceil(beds - impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  const impDollarsInFlight = impact.infectionsByRequestedTime * avgIncome * avgPopulation * days;
  impact.dollarsInFlight = impDollarsInFlight.toFixed(2);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);

  const severeCases = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeCases);

  const availableBeds = beds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(availableBeds);

  const casesForICU = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = Math.trunc(casesForICU);

  const casesForVentilators = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(casesForVentilators);

  const dollarsInFlight = severeImpact.infectionsByRequestedTime * avgIncome * avgPopulation * days;
  severeImpact.dollarsInFlight = dollarsInFlight.toFixed(2);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
