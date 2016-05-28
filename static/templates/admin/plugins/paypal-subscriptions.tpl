<form role="form" class="paypal-subscriptions-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Paypal API Key</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Visit <a href="https://developer.paypal.com">Paypal Developers</a> to create a new <strong>SOAP/NVP</strong> application. For testing purposes, use the credentials found there under <strong>Sandbox -> Accounts -> API Credentials</strong> instead.
			</p>
			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" id="username" name="username" title="Username" class="form-control" placeholder="Username">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="text" id="password" name="password" title="Password" class="form-control" placeholder="Password">
			</div>
			<div class="form-group">
				<label for="signature">Signature</label>
				<input type="text" id="signature" name="signature" title="Signature" class="form-control" placeholder="Signature">
			</div>
			<div class="checkbox">
				<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<input class="mdl-switch__input" type="checkbox" id="is-live" name="is-live">
					<span class="mdl-switch__label">Switch to Live API (Leave unchecked for Sandbox mode)</span>
				</label>
			</div><br />
		</div>
	</div>

	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Subscription Costs</div>
		<div class="col-sm-10 col-xs-12">
			<div class="form-group">
				<label for="monthly">Monthly Cost</label>
				<input type="text" id="monthly" name="monthly" title="Monthly Cost" class="form-control" placeholder="100">
			</div>
			<div class="form-group">
				<label for="annually">Annual Cost</label>
				<input type="text" id="annually" name="annually" title="Annual Cost" class="form-control" placeholder="1000">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>