<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class DashboardSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
    }

    function it_should_set_then_get_id()
    {
        $data = 123;
        $this->setId($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getId()->shouldReturn($data);
    }

    function it_should_set_then_get_uid()
    {
        $data = 'testuid';
        $this->setUid($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getUid()->shouldReturn($data);
    }

    function it_should_set_then_get_user(User $user)
    {
        $this->setUser($user)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getUser()->shouldReturn($user);
    }

    function it_should_set_then_get_name()
    {
        $data = 'testname';
        $this->setName($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getName()->shouldReturn($data);
    }

    function it_should_set_then_get_repo()
    {
        $data = 'testname';
        $this->setRepository($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getRepository()->shouldReturn($data);
    }

    function it_should_set_then_get_theme()
    {
        $data = 'testname';
        $this->setTheme($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getTheme()->shouldReturn($data);
    }

    function it_should_set_then_get_public()
    {
        $data = true;
        $this->setPublic($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->isPublic()->shouldReturn($data);
    }

    function it_should_set_then_get_public_views()
    {
        $data = 100;
        $this->setPublicViews($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getPublicViews()->shouldReturn($data);
    }

    function it_should_set_then_get_created_on()
    {
        $data = new \Datetime;
        $this->setCreatedOn($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getCreatedOn()->shouldReturn($data);
    }

    function it_should_set_then_get_updated_on()
    {
        $data = new \Datetime;
        $this->setUpdatedOn($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getUpdatedOn()->shouldReturn($data);
    }
}
