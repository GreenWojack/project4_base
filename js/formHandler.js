$(function () {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: !0,
    submitSuccess: function (t, e) {
      if (!t.attr("action")) {
        e.preventDefault()
        var i,
          s,
          a =
            ((i = t),
            (s = "./includes/" + i.attr("id") + ".php"),
            i.attr("template-path") && (s = i.attr("template-path") + "/includes/" + i.attr("id") + ".php"),
            s),
          r = {}
        t.find("input, textarea, option:selected").each(function (t) {
          var e = $(this).val(),
            i = $(this).attr("id")
          $(this).is(":checkbox")
            ? (e = $(this).is(":checked"))
            : $(this).is(":radio")
            ? (e = $(this).val() + " = " + $(this).is(":checked"))
            : $(this).is("option:selected") && (i = $(this).parent().attr("id")),
            (r[i] = e)
        }),
          $.ajax({
            url: a,
            type: "POST",
            data: r,
            cache: !1,
            success: function () {
              t.is("[success-msg]")
                ? t.append(
                    "<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                      t.attr("success-msg") +
                      "</strong></div></div>",
                  )
                : window.location.replace(t.attr("success-url")),
                t.trigger("reset")
            },
            error: function () {
              0 == $("#form-alert").length &&
                t.append(
                  "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                    t.attr("fail-msg") +
                    "</strong></div></div>",
                )
            },
          })
      }
    },
    filter: function () {
      return $(this).is(":visible")
    },
  })
})
