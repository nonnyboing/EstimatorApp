const covid19ImpactEstimator = (data) => {
  // const input = data;
  const { reportedCases } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 512;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;

  return {
    input: data,
    Impact: impact,
    SevereImpact: severeImpact
  };
};

export default covid19ImpactEstimator;
