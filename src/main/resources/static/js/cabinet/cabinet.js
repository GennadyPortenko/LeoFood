$(document).ready(function() {
  bindRemoveBtns();

  $("#loadContractorImageBtn").click(function(e) {
    e.preventDefault();
    if ($('#loadContractorImageInput').get(0).files.length === 0) {
      return;
    }
    $(this).prop('disabled',true);
    var formData = new FormData(document.forms.namedItem("loadContractorImageForm"));
    sendImageUploadRequest(formData,
                           function() {
                             console.log("success");
                             location.reload();
                           },
                           function() {},
                           hostURL,
                           "main"
                          );
  });
});

function bindRemoveBtns() {
  $('.cabinet_removeSectionBtn').each(function(index) {
    $(this).click(function() {
      var sectionId = $(this).parent().attr('data-section-id');
      sendRemoveSectionRequest(parseInt(sectionId, 10),
                               function() {
                                 removeSection(sectionId);
                               },
                               function() {},
                               hostURL);
    });
  });

  $('.cabinet_removeProductBtn').each(function(index) {
    $(this).click(function() {
      var productId = $(this).parent().attr('data-product-id');
      sendRemoveProductRequest(parseInt(productId, 10),
                               function() {
                                 $('[data-product-id=' + productId +']').remove();
                               },
                               function() {},
                               hostURL);
    });
  });
}

function removeSection(id) {
  $('[default-section=true]').find('.cabinet_sectionProducts').append($('[data-section-id=' + id +']').find('.cabinet_sectionProducts').html());
  $('[data-section-id=' + id +']').remove();
}
