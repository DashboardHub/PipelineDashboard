<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class SearchSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Search');
    }

    function it_should_set_then_get_keyword()
    {
        $data = 'searchme';
        $this->setKeyword($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Search');
        $this->getKeyword()->shouldReturn($data);
    }
}
