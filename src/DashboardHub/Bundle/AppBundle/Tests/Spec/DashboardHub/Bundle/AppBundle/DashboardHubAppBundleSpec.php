<?php

namespace Spec\DashboardHub\Bundle\AppBundle;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class DashboardHubAppBundleSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\DashboardHubAppBundle');
    }
}
