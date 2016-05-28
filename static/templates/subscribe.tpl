<!-- IF notsetup -->
<div class="alert alert-danger" role="alert">
	<span class="fa fa-exclamation-circle"></span>
	The subscription module has not been properly set-up. Please consult your administrator.
</div>
<!-- ELSE -->
<div class="alert alert-info" role="alert">
	<span class="fa fa-lock"></span>
	In order to gain full access to this forum, you'll need to sign up for a subscription plan.
</div>

<div class="row">
	<div class="col-sm-12 col-md-6">
		<div class="well">
			<form method="POST">
				<select name="period" class="form-control">
					<!-- IF monthly --><option value="Month">Monthly - ${monthly}</option><!-- ENDIF monthly -->
					<!-- IF annually --><option value="Annual">Annually - ${annually}</option><!-- ENDIF annually -->
				</select>
				<br /><br />

				<button type="submit" class="btn btn-lg btn-success">Subscribe</button>
			</form>
		</div>
	</div>
</div>

<!-- ENDIF notsetup -->