/**
 * ga_event_integration
 * @author brian.norman@crometrics.com (10/6/2020)
 * 
 * Module description
 * This module is firing an event to GA each time an Optly experiment activates.  The GA event data contains the Optimizely data for the experiment that was activated.
 */

import {
  log,
  onCampaignDecided
} from 'cromedics/base-pjs';

onCampaignDecided(event => {
  const isCampaignHoldback = event.data.decision.isCampaignHoldback;
  if (!isCampaignHoldback) {
    const eventData = event.data;
    const eventDecision = eventData.decision;
    const experimentId = eventDecision.experimentId;
    const variationId = eventDecision.variationId;
    const eventCampaign = eventData.campaign;
    const experiment = eventCampaign.experiments[0];
    const experimentName = experiment.name;
    const variations = experiment.variations;

    for (let i = 0; i < variations.length; i++) {
      const thisVariation = variations[i];
      if (variationId === thisVariation.id) {
        const variationName = thisVariation.name;
        const categoryString = 'Optimizely';
        const actionString = `ExperimentID: ${experimentId} | ExperimentName: ${experimentName}`;
        const labelString = `VariationID: ${variationId} | VariationName: ${variationName}`;

        ;
        (function pollForGA() {
          if (window.ga === undefined || typeof window.ga !== 'function') {
            if (document.readyState !== 'complete') setTimeout(pollForGA, 100);
          } else {
            window.ga('send', 'event', categoryString, actionString, labelString);
            log('Optimizely experiment data sent to GA:', actionString + ' | ' + labelString);
          }
        })();
      }
    }
  }
});
