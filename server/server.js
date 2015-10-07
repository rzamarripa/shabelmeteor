Meteor.methods({
  sendEmail: function (to, from, subject, html) {
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: html
    });
  }
});

Accounts.onCreateUser(function(options, user) {
  var empresa = Empresas.findOne();
  user.empresa_id = empresa._id;
  return user;
});

Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {fields: {empresa_id: 1}});
});

Meteor.users.allow({
  update: function(empresa_id) {
    return true;
}});
