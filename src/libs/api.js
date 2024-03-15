const __request = async (action, data, type = 'POST') => {
  const { ajax_url } = DC_PHP_DATA;
  return await jQuery.ajax({
    type,
    url: ajax_url,
    data: {
      action,
      data
    }
  });
}

const saveDesign = async (data, postID) => {
  return await __request('dc_ajax_save_design', {
    postID, 
    designJSON: data,
  })
}

const getDesignJsonUrl = async (postID) => {
  return await __request('dc_ajax_get_design_json_url', {
    postID
  });
}

const saveSubmission = async (submissionData) => {
  return await __request('dc_ajax_save_submission', {
    submissionData
  });
}

const uploadImageRequest = async (formData) => {
  formData.append('action', 'dc_ajax_upload_image');      

  const res = await jQuery.ajax({
    type: 'POST',
    url: DC_PHP_DATA.ajax_url,
    data: formData,
    contentType: false, 
    processData: false,
  })

  return res;
}

export { __request, saveDesign, getDesignJsonUrl, saveSubmission, uploadImageRequest }