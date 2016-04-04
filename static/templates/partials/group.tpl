<!-- BEGIN subscription -->
<div class="row feed well">
		<div class="col-sm-12 col-xs-12">
			<div class="form-group">
				<label>Subscription</label>
				<input type="text" class="form-control subscription-name" placeholder="Enter the subscription's name" value="{subscription.name}">
			</div>
		</div>
		<br/>
		<div class="clearfix">
			<div class="col-sm-3 col-xs-12">
				<div class="form-group">
					<label>Group</label>
					<select class="form-control subscription-group" data-group="{subscription.group}">

					</select>
				</div>
			</div>
			<div class="col-sm-2 col-xs-12">
				<div class="form-group">
  				<label>Grace Interval</label>
  				<select class="form-control subscription-grace-interval" data-interval="{subscription.graceinterval}">
  				  <option value="minute">Minutes</option>
  					<option value="hour">Hours</option>
  					<option value="day">Days</option>
  					<option value="week">Weeks</option>
  					<option value="month">Months</option>
  					<option value="year">Years</option>
  				</select>
  			</div>
		  </div>
  		<div class="col-sm-2 col-xs-12">
  			<div class="form-group">
  				<label>Length</label>
  				<input type="text" class="form-control subscription-grace-length" placeholder="How long does the grace period last?" value="{subscription.gracelength}">
  			</div>
  		</div>
			<div class="col-sm-2 col-xs-12">
				<div class="form-group">
  				<label>Trial Interval</label>
  				<select class="form-control subscription-interval" data-interval="{subscription.trialinterval}">
  				  <option value="minute">Minutes</option>
  					<option value="hour">Hours</option>
  					<option value="day">Days</option>
  					<option value="week">Weeks</option>
  					<option value="month">Months</option>
  					<option value="year">Years</option>
  				</select>
  			</div>
		  </div>
  		<div class="col-sm-2 col-xs-12">
  			<div class="form-group">
  				<label>Length</label>
  				<input type="text" class="form-control subscription-trial-length" placeholder="How long does the trial period last?" value="{subscription.triallength}">
  			</div>
  		</div>
		</div>

		
		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>User</label>
				<input type="text" class="form-control subscription-admin" placeholder="User to control group as" value="{subscription.username}">
			</div>
		</div>
		
		
		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>Pay</label>
				<input type="text" class="form-control subscription-cost" placeholder="Renewal cost of subscription" value="{subscription.cost}">
			</div>
		</div>

		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>Per</label>
				<select class="form-control subscription-interval" data-interval="{subscription.interval}">
				  <option value="minute">Minutes</option>
					<option value="hour">Hours</option>
					<option value="day">Days</option>
					<option value="week">Weeks</option>
					<option value="month">Months</option>
					<option value="year">Years</option>
				</select>
			</div>
		</div>

		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label># Intervals / Default Subscription</label>
				<input type="text" class="form-control subscription-length" placeholder="How many payment intervals does a subscription last?" value="{subscription.entriesToPull}">
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>Removal Behvaior</label>
				<select class="form-control subscription-behavior" data-endbehavior="{subscription.endBehavior}">
					<option value="blocked">Removed Until Paid</option>
					<option value="grace">Grace Period</option>
				</select>
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>&nbsp;</label>
				<button class="form-control remove btn-warning">Remove</button>
			</div>
		</div>
	</div>
	<!-- END subscription -->
