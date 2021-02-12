/**
 * ga_experiment_tracking
 * @author brian.norman@crometrics.com (2/11/2021)
 *
 * Module description
 * This module sends Optimizely experiment data to Google Analytics.
 *
 * IMPORTANT: You must set the `PJS.googleAnalyticsProperty` variable in project.js prior to this module's import
 */

import {
  log,
  error,
  onCampaignDecided
} from 'base-pjs';
if (PJS.googleAnalyticsProperty) {
  const tracker = 'cro_optimizely';

  onCampaignDecided(data => {
    const utils = window.optimizely.get('utils');
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
          const eventCategory = 'Optimizely';
          const eventAction = `${experimentId} | ${experimentName}`;
          const eventLabel = `${variationId} | ${thisVariation.name}`;
          utils.waitUntil(() => !!(window.ga && window.ga.getByName)).then(() => {
            // Define our tracker if it hasn't been already.
            if (!window.ga.getByName(tracker)) {
              window.ga("create", PJS.googleAnalyticsProperty, {
                name: tracker,
                cookieDomain: "auto"
              });
            }

            window.ga(`${tracker}.send`, 'event', eventCategory, eventAction, eventLabel, {
              nonInteraction: 1 // non-interaction hit | true
            });
            log(`Event Category: ${eventCategory} | Event Action: ${eventAction} | Event Label: ${eventLabel}`);
          }).catch(error);
        }
      }
    }
  });
} else {
  error('PJS.googleAnalyticsProperty must be set in project.js prior to importing this module.');
}
