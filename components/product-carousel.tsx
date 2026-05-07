"use client";

import { useState } from "react";
import { Button, CardMedia, MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export function ProductCarousel({ images, title }: { images: string[]; title: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length || 1;

  return (
    <>
      <CardMedia
        component="img"
        height="340"
        image={images[activeStep] ?? ""}
        alt={title}
        sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
      />
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => setActiveStep((prev) => prev + 1)}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => setActiveStep((prev) => prev - 1)} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </>
  );
}
