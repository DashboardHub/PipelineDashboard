<?php

namespace Spec\Quickstart\Bundle\AppBundle\Service;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class RandomUsernameGeneratorSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('Quickstart\Bundle\AppBundle\Service\RandomUsernameGenerator');
    }

    function it_should_generate_a_string()
    {
        $this->getUsername()
             ->shouldBeString();
    }

    function it_should_generate_a_unique_username_each_time()
    {
        $this->getUsername()->shouldBeUnique();
        $this->getUsername()->shouldBeUnique();
        $this->getUsername()->shouldBeUnique();
    }

    public function getMatchers()
    {
        return array(

            'beUnique' => function($value)
            {
                static $observedValues = array();

                if (in_array($value, $observedValues)) {
                    return false;
                }

                $observedValues[] = $value;
                return true;
            },
        );
    }
}
