/**
 * ga_experiment_tracking
 * @author brian.norman@crometrics.com (2/11/2021)
 * @author brian.norman@crometrics.com (added events: 4/9/2021)
 * 
 * Module description
 * This module sends Optimizely experiment data to Google Analytics.
 *
 * IMPORTANT: You must set the `PJS.googleAnalyticsProperty` variable in project.js prior to this module's import
 */

import {
  log,
  error,
  onInitialized,
  onCampaignDecided,
  onTrackEvent
} from 'base-pjs';
if (PJS.googleAnalyticsProperty) {
  const GA_TRACKER = 'cro_optimizely';

  onInitialized(() => {
    const utils = window.optimizely.get('utils');

    const waitForGA = utils.waitUntil(() => window.ga && window.ga.getByName).then(() => {
      if (!window.ga.getByName(GA_TRACKER)) {
        window.ga("create", PJS.googleAnalyticsProperty, {
          name: GA_TRACKER,
          cookieDomain: "auto"
        });
      }
    }).catch(error);

    const sendEventToGA = (eventCategory, eventAction, eventLabel) => {
      waitForGA.then(() => {
        window.ga(`${GA_TRACKER}.send`, 'event', eventCategory, eventAction, eventLabel, {
          nonInteraction: 1 // non-interaction hit | true
        });
        log(`Event Category: ${eventCategory} | Event Action: ${eventAction} | Event Label: ${eventLabel}`);
      }).catch(error);
    };

    onCampaignDecided(data => {
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
            sendEventToGA(eventCategory, eventAction, eventLabel);
          }
        }
      }
    });

    onTrackEvent(event => {
      waitForGA.then(() => {
        const eventCategory = 'Optimizely';
        const eventAction = `Conversion`;
        const eventLabel = event.name || event.id;
        sendEventToGA(eventCategory, eventAction, eventLabel);
      }).catch(error);
    });
  });
} else {
  error('PJS.googleAnalyticsProperty must be set in project.js prior to importing this module.');
}
