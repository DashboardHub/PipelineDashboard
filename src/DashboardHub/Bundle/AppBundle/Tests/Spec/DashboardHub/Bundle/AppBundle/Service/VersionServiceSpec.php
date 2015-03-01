<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Service;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class VersionServiceSpec extends ObjectBehavior
{
    function let()
    {
        $this->beConstructedWith('VERSION', true);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Service\VersionService');
    }

    function it_should_get_current_version()
    {
        $this->current()
             ->shouldReturn('-- UNKNOWN --');
    }
}
