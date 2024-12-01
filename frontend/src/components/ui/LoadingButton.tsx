import React from "react";

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      className="btn btn-warning orange form-control d-flex align-items-center justify-content-center"
      onClick={onClick}
      disabled={isLoading || disabled}
      style={{ minWidth: "100px" }} // Minimum genişlik stabil bir görünüm sağlar
    >
      {isLoading ? (
        <div
          className="spinner-border spinner-border-sm text-light me-2"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      {text}
    </button>
  );
};

export default LoadingButton;
