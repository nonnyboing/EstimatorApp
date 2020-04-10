const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
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
  const beds = Math.trunc(totalHospitalBeds * 0.35);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = beds - impact.severeCasesByRequestedTime;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
  const severeCases = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeCases);
  severeImpact.hospitalBedsByRequestedTime = beds - severeImpact.severeCasesByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
