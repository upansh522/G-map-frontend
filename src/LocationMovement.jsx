import React, { useEffect, useState } from 'react';

const LocationMovement = ({ steps, setCurrentLocation, speed }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    if (steps && steps.length > 0 && isMoving) {
      if (stepIndex < steps.length) {
        const intervalId = setInterval(() => {
          setCurrentLocation(steps[stepIndex].end_location);          

          setStepIndex((prevIndex) => prevIndex + 1);
        }, speed * 1000);

        return () => clearInterval(intervalId); // Clear interval on component unmount
      } else {
        setIsMoving(false);
      }
    }
  }, [steps, stepIndex, speed, isMoving]);

  return null;
};

export default LocationMovement;