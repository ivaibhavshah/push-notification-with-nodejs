export function Notification(params) {
    let message = {
        notification: {
            title: params.title,
            body: params.body
        },
    }
    if(params.topic){
        message.topic = params.topic
    }
    else if(params.tokens){
        message.tokens = params.tokens
    }
    else{
        message.token = params.token
    }
    if (params.android) {
        message.android = params.android
    }
    if (params.apn) {
        message.apns = {
            payload: {
                aps: {
                    'category': 'INVITE_CATEGORY'
                }
            }
        }
    }
    if (params.webpush) {
        message.webpush = {
            fcmOptions: {
                link: 'breakingnews.html'
            }
        }
    }    
    return message
}