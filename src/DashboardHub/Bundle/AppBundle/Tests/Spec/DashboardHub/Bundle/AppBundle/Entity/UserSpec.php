<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class UserSpec extends ObjectBehavior
{

    function let()
    {
        $this->beConstructedWith('testusername');
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\User');
    }

    function it_should_set_then_get_id()
    {
        $data = 123;
        $this->setId($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\User');
        $this->getId()->shouldReturn($data);
    }

    function it_should_get_dashboards()
    {
        $this->getDashboards()
             ->shouldHaveType('Doctrine\Common\Collections\ArrayCollection');
    }

    function it_should_set_then_get_dashboards()
    {
        $data = new ArrayCollection();
        $this->setDashboards($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\User');
        $this->getDashboards()->shouldReturn($data);
    }
}
