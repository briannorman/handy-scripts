function onCampaignDecided(event) {
  const data = event.data;
  const eventDecision = data.decision;
  const isCampaignHoldback = eventDecision.isCampaignHoldback;
  const experimentId = eventDecision.experimentId;
  const variationId = eventDecision.variationId;

  if (!isCampaignHoldback && experimentId && variationId) {
    const eventCampaign = data.campaign;
    const experiment = eventCampaign.experiments[0];
    const experimentName = experiment.name;
    const variations = experiment.variations;

    for (let i = 0; i < variations.length; i++) {
      const thisVariation = variations[i];
      if (variationId === thisVariation.id) {
        const variationName = thisVariation.name;
        console.log('experimentId: ', experimentId);
        console.log('experimentName: ', experimentName);
        console.log('variationId: ', variationId);
        console.log('variationName: ', variationName);

        // send data to third party here
      }
    }
  }
};

window.optimizely.push({
  type: 'addListener',
  filter: {
    type: 'lifecycle',
    name: 'campaignDecided'
  },
  handler: onCampaignDecided
});
