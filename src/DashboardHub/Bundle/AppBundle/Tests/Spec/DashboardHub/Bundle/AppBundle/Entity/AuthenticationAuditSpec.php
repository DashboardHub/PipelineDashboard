<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class AuthenticationAuditSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit');
    }

    function it_should_set_then_get_id()
    {
        $data = 123;
        $this->setId($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit');
        $this->getId()->shouldReturn($data);
    }

    function it_should_set_then_get_user(User $user)
    {
        $this->setUser($user)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit');
        $this->getUser()->shouldReturn($user);
    }

    function it_should_set_then_get_created_on()
    {
        $data = new \Datetime;
        $this->setCreatedOn($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit');
        $this->getCreatedOn()->shouldReturn($data);
    }
}
