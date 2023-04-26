import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorPage(){
    return (
        <h1>Something went wrong</h1>
    )
}
export default function ReactErrorBoundary(props) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorPage}
            onError={(error, errorInfo) => {
                // log the error
		console.log("Error caught!");  
		console.error(error);  
		console.error(errorInfo);
		
		// record the error in an APM tool...
            }}
        >
            {props.children}
        </ErrorBoundary>
    )}