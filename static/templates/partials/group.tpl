<!-- BEGIN subscription -->
<div class="row feed well">
		<div class="col-sm-12 col-xs-12">
			<div class="form-group">
				<label>Subscription</label>
				<input type="text" class="form-control feed-url" placeholder="Enter the RSS feed URL" value="{subscription.name}">
			</div>
		</div>
		<br/>
		<div class="clearfix">
			<div class="col-sm-3 col-xs-12">
				<div class="form-group">
					<label>Category</label>
					<select class="form-control subscription-group" data-group="{subscription.group}">

					</select>
				</div>
			</div>
			<div class="col-sm-2 col-xs-12">
				<div class="form-group">
  				<label>Grace Interval</label>
  				<select class="form-control feed-interval" data-interval="{subscription.graceinterval}">
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
  				<input type="text" class="form-control feed-entries-to-pull" placeholder="How many payment intervals does a subscription last?" value="{subscription.gracelength}">
  			</div>
  		</div>
			<div class="col-sm-2 col-xs-12">
				<div class="form-group">
  				<label>Trial Interval</label>
  				<select class="form-control feed-interval" data-interval="{subscription.trialinterval}">
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
  				<input type="text" class="form-control feed-entries-to-pull" placeholder="How many payment intervals does a subscription last?" value="{subscription.triallength}">
  			</div>
  		</div>
		</div>

		
		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>User</label>
				<input type="text" class="form-control feed-user" placeholder="User to control group as" value="{subscription.username}">
			</div>
		</div>
		
		
		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>Pay</label>
				<input type="text" class="form-control feed-entries-to-pull" placeholder="Renewal cost of subscription" value="{subscription.entriesToPull}">
			</div>
		</div>

		<div class="col-sm-2 col-xs-12">
			<div class="form-group">
				<label>Per</label>
				<select class="form-control feed-interval" data-interval="{subscription.interval}">
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
				<input type="text" class="form-control feed-entries-to-pull" placeholder="How many payment intervals does a subscription last?" value="{subscription.entriesToPull}">
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>Removal Behvaior</label>
				<select class="form-control feed-topictimestamp" data-topictimestamp="{subscription.endBehavior}">
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

		<input type="hidden" class="form-control feed-lastEntryDate" value="{subscription.lastEntryDate}">
	</div>
	<!-- END subscription -->
