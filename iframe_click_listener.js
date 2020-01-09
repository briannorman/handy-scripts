let hovering = false;
        $(iframe).hover(() => {
          hovering = true;
        }, () => {
          hovering = false;
        });

        $(window).blur(() => {
          if (hovering) {
            // iframe clicked! do things!
            window.optimizely.push({
              type: 'event',
              eventName: 'strz9_cancellation_video_interaction'
            });
            setTimeout(() => {
              window.focus();
            }, 0);
          }
        });
