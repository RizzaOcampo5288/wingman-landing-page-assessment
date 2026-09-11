export default async (request) => {
    // Only allow POST requests
    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        // Get data sent from the form
        const data = await request.json();

        const {
            name,
            email,
            company,
            phone,
            message
        } = data;

        // Server-side validation
        if (!name || !email || !company || !phone || !message) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Please complete all required fields."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Please enter a valid email address."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        /*
         * SIMULATED CRM 
         *
         * The HubSpot API token would be stored as a
         * Netlify environment variable, not in this file.
         */

        const crmResult = {
            success: true,
            contactId: `demo-${Date.now()}`
        };

       console.log("Lead received:", {
            name,
            email,
            company,
            phone,
            message
        });

        console.log("CRM simulation:", crmResult);

        // Successful API response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Lead submitted successfully.",
                contactId: crmResult.contactId
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        console.error("Lead API error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal server error."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
