import axios from 'axios';

// Function to get access token
export async function getAccessToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', '3MVG9JJwBBbcN47KDHo767ak9S9sVDfH5BXIsA_zCXa47UiCG_oWVpiWGWU4Q9cC.pJk7oHA6lTXMy5mrNzsR'); // Replace with your client ID
    params.append('client_secret', '7CBC093317028E48F9E92B560B5811F2CC8BF0A65975C64ED65BA6E93CBCADFB'); // Replace with your client secret
    params.append('username', 'automation_org@altimetrik.com'); // Replace with your Salesforce username
    params.append('password', 'Altimetrik.2024Ni6jJIZFNFW7omwUuX7r8KFzA'); // Replace with your Salesforce password + security token

    try {
        const response = await axios.post('https://login.salesforce.com/services/oauth2/token', params);
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
    }
}

// Function to create an account
export async function createAccount(accountName: string) {
    const accessToken = await getAccessToken();

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const data = {
        Name: accountName
    };

    try {
        const response = await axios.post('https://your-instance.salesforce.com/services/data/vXX.X/sobjects/Account', data, { headers });
        console.log('Account created with ID:', response.data.id);
    } catch (error) {
        console.error('Error creating account:', error);
    }
}

//automation_org@altimetrik.com / Altimetrik.2024
//customer key: 3MVG9JJwBBbcN47KDHo767ak9S9sVDfH5BXIsA_zCXa47UiCG_oWVpiWGWU4Q9cC.pJk7oHA6lTXMy5mrNzsR
//customer secret: 7CBC093317028E48F9E92B560B5811F2CC8BF0A65975C64ED65BA6E93CBCADFB
//security token: Ni6jJIZFNFW7omwUuX7r8KFzA