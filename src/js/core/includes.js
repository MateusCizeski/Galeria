import $ from 'jquery'
const onLoadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!onLoadHtmlSuccessCallbacks.includes(callback)){
       onLoadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                onLoadHtmlSuccessCallbacks.forEach(callback => callback(data))

                loadIncludes(e)
            }
        })
    })
}

loadIncludes()