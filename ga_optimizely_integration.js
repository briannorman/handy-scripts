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

        window.optimizely.get('utils').waitUntil(() => !!(window.ga && window.ga.getByName)).then(() => {
          const eventCategory = "Optimizely";
          const eventAction = `${experimentName} (${experimentId})`;
          const eventLabel = `${variationName} (${variationId})`;
          window.ga(`send`, 'event', eventCategory, eventAction, eventLabel, {
            nonInteraction: 1 // non-interaction hit | true
          });
          console.log(`Event Category: ${eventCategory} | Event Action: ${eventAction} | Event Label: ${eventLabel}`);
        });
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
